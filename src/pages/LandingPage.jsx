// pages/LandingPage.jsx
import HeroPage from "../components/heropage";
import MarketTicker from "../components/marketicker";
import Problem from "../components/problem";
import SocialProof from "../components/socialproof";
import CTA from "../components/cta";
import Footer from "../components/footer";
//import RecomndationEngine from "../components/recomndationengine";
export default function LandingPage(){
    return (
        // Remove 'min-h-screen' here to let the page grow naturally with its children
        <div className="bg-[#080808] w-full">
     
            <HeroPage />

           
                <MarketTicker />

                <Problem />
            
                <SocialProof />
                <CTA/>
                <Footer />

            

        
        </div>
    );
}
