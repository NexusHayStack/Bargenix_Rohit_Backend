const data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

const handlers = {};

// Generate coupon
handlers.generateCoupon = (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res(400, { error: 'Missing required productId' });
    }

    const coupon = helpers.generateCoupon(productId);
    const expiry = Math.floor(Date.now() / 1000) + config.tokenExpiry;

    const coupons = data.read('', 'coupons') || {};
    coupons[coupon] = { productId, expiry };
    data.write('', 'coupons', coupons);

    helpers.log('CouponGenerated', { productId, coupon });
    res(200, { coupon, expiry });
};

// Validate coupon
handlers.validateCoupon = (req, res) => {
    const { coupon, productId } = req.body;

    if (!coupon || !productId) {
        return res(400, { error: 'Missing required fields' });
    }

    const coupons = data.read('', 'coupons') || {};
    const couponData = coupons[coupon];

    if (!couponData || couponData.productId !== productId) {
        return res(400, { error: 'Invalid coupon or product mismatch' });
    }

    if (!helpers.isCouponValid(coupon, couponData.expiry)) {
        return res(400, { error: 'Coupon expired' });
    }

    helpers.log('CouponValidated', { coupon, productId });
    res(200, { success: 'Coupon is valid' });
};

// Log request
handlers.logRequest = (req, res) => {
    const logs = data.read('', 'logs') || [];
    logs.push({ timestamp: Date.now(), ...req.body });
    data.write('', 'logs', logs);

    res(200, { success: 'Request logged' });
};

module.exports = handlers;
