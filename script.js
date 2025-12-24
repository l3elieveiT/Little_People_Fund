function loanApp() {
    return {
        step: 'welcome',
        amount: 20000,
        term: 12,
        loading: false,
        idCard: '',
        fullName: '',
        phone: '',
        errors: [],

        nextStep(s) {
            this.loading = true;
            setTimeout(() => {
                this.step = s;
                this.loading = false;
                window.scrollTo(0, 0);
            }, 500);
        },

        calculateMonthly() {
            return Math.ceil((this.amount / this.term) + (this.amount * 0.005)).toLocaleString();
        },

        validate() {
            this.errors = [];
            
            // Validate ID Card (Numbers only)
            if (!this.idCard) {
                this.errors.push('กรุณากรอกเลขบัตรประชาชน');
            } else if (!/^\d+$/.test(this.idCard.replace(/-/g, ''))) {
                this.errors.push('เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น');
            }

            // Validate Name (No numbers)
            if (!this.fullName) {
                this.errors.push('กรุณากรอกชื่อ-นามสกุล');
            } else if (/\d/.test(this.fullName)) {
                this.errors.push('ชื่อ-นามสกุลต้องเป็นตัวอักษรเท่านั้น');
            }

            // Validate Phone (Numbers only)
            if (!this.phone) {
                this.errors.push('กรุณากรอกเบอร์โทรศัพท์');
            } else if (!/^\d+$/.test(this.phone)) {
                this.errors.push('เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น');
            }

            if (this.errors.length === 0) {
                this.nextStep('success');
            } else {
                this.step = 'error-page';
            }
        }
    }
}