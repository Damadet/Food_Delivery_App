import aboutImage from "../assets/images/about-image.png";

export const About = () => {

    return (
        <div className="bg-white">
            <div className="p-24 grid grid-cols-2">
                <div className="">
                    <h2 className="text-2xl font-medium">About Us</h2>
                    <br />
                    <p className="text-lg">
                    Yummy Request was established in 2023 as a result of the need to bridge the gap between purchasing quality homemade delicacies and avail
                    Our menu includes crisp, tasty, home-made Nigerian traditional delicacies and intercontinental dishes. Our food is solid and YUMMY. We offer a broad range of traditional and intercontinental menu to make the best choices.
                    Make a order and try us out! We will come to you! 
                    <br/>
                    At Yummy Request, our energy, qualities and objectives depend on a certain something, the drive to satisfy our customers!
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}