// pages/LandingPage.jsx
import HeroPage from "../components/heropage";
import MarketTicker from "../components/marketicker";
import Problem from "../components/problem";

export default function LandingPage(){
    return (
        // Remove 'min-h-screen' here to let the page grow naturally with its children
        <div className="bg-[#080808] w-full">
     
            <HeroPage />

           
                <MarketTicker />

                <Problem />

            

        
        </div>
    );
}