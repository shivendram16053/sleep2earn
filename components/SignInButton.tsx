import React from "react";
import { DollarSign } from "lucide-react";

const SignInButton: React.FC = () => {
    const handleSignIn = () => {
        window.location.href = "/api/auth/fitbit";
    };

    return (
        <button
            onClick={handleSignIn}
            className="px-6 py-3 text-black font-medium rounded-full flex items-center gap-2 bg-gradient-to-b from-white to-gray-200
                       shadow-md relative overflow-hidden transition-transform duration-500 ease-in-out hover:scale-110 active:scale-100
                       border-2 border-purple-500 animate-glow"
        >
            <span>
                <DollarSign className="h-5 w-5 text-purple-500" />
            </span>
            Earn Now
        </button>
    );
};

export default SignInButton;
