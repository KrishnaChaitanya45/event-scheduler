import Background from "../assets/Background.svg";
import GirlAvatar from "../assets/women_in_background.svg";
import Navbar from "../components/Navbar";
import RegisterOrLoginHeading from "../components/RegisterOrLogin._Heading";
import AuthForm from "../forms/AuthForm";
type AddFunction = (msg: { msg: string; title: string; type: string }) => void;
function Register() {
  return (
    <main
      className={` text-white  lg:h-screen flex items-center justify-center`}
      style={{
        backgroundColor: `#000`,
        backgroundImage: `url(${Background})`,
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
      }}
    >
      <section className="w-[90vw] flex lg:flex-row flex-col gap-[5vh] md:gap-[10vh] justify-around items-center py-[10vh] lg:h-[90vh]">
        <RegisterOrLoginHeading />
        <div className="h-[100%] flex items-center justify-center">
          <img
            src={GirlAvatar}
            alt="Woman_In_Background"
            className=" h-[50vh]  md:h-[60vh] ml-[10vw] lg:ml-0"
          />
        </div>
        <div className="flex flex-col lg:h-[90%] h-[40vh] justify-between  relative min-w-[70vw] lg:min-w-[25vw] xl:min-w-fit">
          <Navbar />
          <div className="self-center">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
