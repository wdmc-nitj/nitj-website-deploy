const express = require('express');
const router = express.Router();
const sampController = require('../controllers/samp');

// Health Check
router.get('/health', (req, res) => res.status(200).json({ message: 'Service is running' }));

// Main Routes
router.get('/', sampController.home);
router.post('/login', sampController.validateLogin, sampController.login);
router.post('/register', [
  sampController.validateRegister,
  sampController.checkUser
], sampController.register);

// Password Reset & OTP Routes
router.post('/generate-otp', sampController.generateOtp);
router.post('/verify-otp', sampController.verifyOtp);
router.post('/reset-password', sampController.resetPassword);

// Protected User Routes
router.get('/users', sampController.authenticate, sampController.getAllUsers);
router.post('/users', [
  sampController.authenticate,
  sampController.isAdmin,
  sampController.validateRegister,
  sampController.checkUser
], sampController.addUser);
router.put('/users/:id', [
  sampController.authenticate,
  sampController.isAdmin
], sampController.updateUser);
router.delete('/users/:id', [
  sampController.authenticate,
  sampController.isAdmin
], sampController.deleteUser);

// Experience Routes
router.get('/experiences', sampController.getAllExp);
router.post('/experiences', [
  sampController.authenticate,
  sampController.isAdmin
], sampController.addExperience);
router.put('/experiences/:id', [
  sampController.authenticate,
  sampController.isAdmin
], sampController.updateExperience);
router.delete('/experiences/:id', [
  sampController.authenticate,
  sampController.isAdmin
], sampController.deleteExperience);

module.exports = router;