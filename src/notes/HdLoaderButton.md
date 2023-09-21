**⚠️ The disabled option still triggers a "click" event.**

Please note that the disabled prop will change the state and block clicks to trigger the animation, but still emits a click event.<br />
This is working as designed, as some forms want to trigger long running processes for validations.