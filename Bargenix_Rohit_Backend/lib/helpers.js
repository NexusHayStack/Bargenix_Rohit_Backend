const crypto = require('crypto');

const helpers = {
    generateCoupon: (productId) => {
        return `${productId}-${crypto.randomBytes(6).toString('hex')}`;
    },

    isCouponValid: (coupon, expiry) => {
        const now = Math.floor(Date.now() / 1000);
        return coupon && now <= expiry;
    },

    log: (type, data) => {
        console.log(`[${new Date().toISOString()}] [${type.toUpperCase()}]:`, data);
    },
};

module.exports = helpers;
