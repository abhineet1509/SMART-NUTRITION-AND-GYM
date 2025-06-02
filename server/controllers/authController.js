import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {

         const existingUser = await userModel.findOne({ email });
         if (existingUser) {
                return res.json({ success: false, message: 'User already exists' });
            }
      const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:'7d'});
        
        res.cookie('token', token,
             {  httpOnly: true,
                secure: process.env.NODE_ENV=== 'production',
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
                maxAge : 7 * 24 * 60 * 60 * 1000
             }); 


            const mailOptions = {
                from: "kumarabhineet409@gmail.com",  // ✅ Correct "from" format
                to: email,
                subject: "Welcome to Fit Work 🎉",
                html: `
                    <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="text-align: center; color: #333;">Welcome to [Your App Name] 🎉</h2>
                        <p style="font-size: 16px; color: #555;">Hi <strong>Fit Work</strong>,</p>
                        <p style="font-size: 16px; color: #555;">Thank you for signing up! Your account has been successfully created. You can now log in and start using our services.</p>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="[YOUR_APP_LOGIN_URL]" style="font-size: 18px; font-weight: bold; color: #fff; text-decoration: none; padding: 10px 20px; background: #007bff; border-radius: 5px; display: inline-block;">
                                Login Now
                            </a>
                        </div>
                        
                        <p style="font-size: 14px; color: #888;">If you did not create this account, please ignore this email.</p>
                        <p style="font-size: 14px; color: #888; text-align: center;">&copy; 2025 Fit Work. All rights reserved.</p>
                    </div>
                `,
            };
        
            await transporter.sendMail(mailOptions);
        
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'User created successfully'});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
      const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid user' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:'7d'});

        
        res.cookie('token', token,
             {  httpOnly: true,
                secure: process.env.NODE_ENV=== 'production',
                sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
                maxAge : 7 * 24 * 60 * 60 * 1000
             }); 

        return  res.json({ success: true, message: 'User logged in successfully', user });

      
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
   try {
    res.clearCookie('token', 
        {  httpOnly: true,
           secure: process.env.NODE_ENV=== 'production',
           sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
        }); 
    return res.json({ success: true, message: 'User logged out successfully' });
   } catch (error) {
         res.json({ success: false, message: error.message });
   }
}

export const sendVerifyOtp = async (req, res) => {

    try{
      const { userId} = req.body;
      const user = await userModel.findById(userId);
        if(user.isAccountVerified ){
            return res.json({ sucess:false,message:"Account already verified" });
        }

        const otp = string(Math.floor(100000 + Math.random() * 900000)); 
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions ={
            from:"kumarabhineet409@gmail.com",
            to:user.email,
            subject:'your OTP for account verification',
            text:`Your OTP for account verification is ${otp}`
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success:true,message:"OTP sent successfully" });
    } catch(error){
        res.json({ success: false, message: error.message });
    }
}
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if(!userId || !otp){
        return res.json({ success:false,message:"Missing details"});
    }
    try{
       
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({ success:false,message:"Invalid user" });
        }
        if(user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now() || user.verifyOtp === ''){
            return res.json({ success:false,message:"Invalid OTP" });
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({ success:true,message:"Email verified successfully" });
    } catch(error){
        res.json({ success: false, message: error.message });
    }
} 
export const isAuthenticated = async (req, res) => {
    try{
        return res.json({ success:true, message:"Authenticated"});
    } catch(error){
        res.json({success:false,message:error.message});
    }
}
export const sendResetOtp = async (req, res) => {
 const { email } = req.body;
 if(!email){
    return res.json({ success:false,message:"Email is required "});
 }
 try{
    const user = await userModel.findOne({ email });
    if(!user){
        return res.json({ success:false,message:"User Not Found" });
    }
    const otp = string(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOption = {
        from: "kumarabhineet409@gmail.com",
        to: user.email,
        subject: 'Your OTP for password reset',
        text: `Your OTP for password reset is ${otp}`
        };
    await transporter.sendMail(mailOption);
    return res.json({ success:true,message:"OTP sent successfully" });
    } catch(error){
        res.json({ success:false,message:error.message });
    }
}
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword){
        return res.json({ success:false,message:"Email,Otp,New Password are required" });
    }
    try{
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({ success:false,message:"Invalid User" });
        }
        if(user.resetOtp !== otp || user.resetOtpExpireAt < Date.now() || user.resetOtp === ''){
            return res.json({ success:false,message:"Invalid OTP" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({ success:true,message:"Password reset successfully" });
    }
    catch(error){
        res.json({ success:false,message:error.message });
    }

}