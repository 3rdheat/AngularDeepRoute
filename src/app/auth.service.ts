
export class AuthService{
    loggedIn = false;

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 1000);
            }
        )

        return promise;

    }

    login(){
        this.loggedIn = true;
        console.log('Logged in!');
    }

    logout(){
        this.loggedIn = false;
        console.log('Logged out!');
    }

}

