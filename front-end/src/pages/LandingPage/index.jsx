import { BannerLandingPage } from "../../components/BannerLandingPage";
import { About } from "../../components/About";
import { ProductsPreview } from "../../components/ProductsPreview";
import { HeaderLandingPage } from "../../components/HeaderLandingPage";
const LandingPage = () => {
    return (
        <>
            <HeaderLandingPage />
            <BannerLandingPage />
            <ProductsPreview />
            <About />
        </>
    )
}

export default LandingPage;