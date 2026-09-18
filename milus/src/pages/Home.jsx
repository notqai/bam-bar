import Hero from '../components/Hero.jsx'
import PromoRibbon from '../components/PromoRibbon.jsx'
import Flavours from '../components/Flavours.jsx'
import Bundle from '../components/Bundle.jsx'
import MadeFresh from '../components/MadeFresh.jsx'
import CrookieFeature from '../components/CrookieFeature.jsx'
import VideoSection from '../components/VideoSection.jsx'
import FindUs from '../components/FindUs.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <PromoRibbon />
      <Flavours />
      <Bundle />
      <MadeFresh />
      <CrookieFeature />
      <VideoSection />
      <FindUs />
    </>
  )
}
