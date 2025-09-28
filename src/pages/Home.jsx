import Faq from "@/components/Faq"
import Feature from "@/components/Feature"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Services from "@/components/Services"
import Subscribe from "@/components/Subscribe"
import Why from "@/components/Why"
import OmniVestFeature from "@/components/OmniVestFeature"
import WhatIsOmniVest from "@/components/WhatIsOmniVest"

function Home() {
    return (
        <div className="bg-[#05140D]  overflow-hidden">
            <Navbar />
            <Hero />
            <WhatIsOmniVest />
            <OmniVestFeature />
            <Why />
            <Feature />
            <Faq />
            <Subscribe />
        </div>


    )
}

export default Home