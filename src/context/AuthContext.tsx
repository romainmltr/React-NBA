import React, { useState, useEffect } from "react";

function AuthContextProvider(props: any) {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const isLogged = localStorage.getItem("isAuthenticated");
        if (isLogged) {
            console.log("User is logged")
            setIsLogged(true);
        }else{
            console.log("User is not logged")
            setIsLogged(false);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const AuthContext = React.createContext({
    isLogged: false,
    setIsLogged: (isLogged: boolean) => {},
});

export default AuthContextProvider;
