export default {

    isElectron() {
        return true
    },
    getServe() {
        if (process.env.NODE_ENV === 'production') {
            return "http://100.0.100.194:3000/";
        } else {
            return "http://localhost:3000/"
        }
    },
    getBase() {
        return this.getServe() + "ejemplo/";
    },
 
    getHeader() {
        return {
            headers: {
                Accept: "application/json",
               // Authorization: this.getToken()
            }
        };
    },
};