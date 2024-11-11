import presentation from "../assets/present.png";
import photography from "../assets/photography.png";

const About = () => {
  return (
    <div className="w-full bg-white p-28">
      <h1 className="text-xl w-[248px] h-[88px] -mt-16">About</h1>
      <h1 className="bg-[#CF796C] -mt-[60px] max-w-56 -ml-32 text-right text-lg text-white border-2 border-orange-400 pr-2">
        Captcharts
      </h1>

      <div className="text-gray-700 max-w-full md:max-w-5xl xl:max-w-6xl 2xl:max-w-5xl mx-auto mt-5 space-y-8">
        <p className="text-justify font-light text-sm md:text-base lg:text-md leading-relaxed opacity-[60%]">
          Welcome to the world of limitless creativity and boundless
          possibilities! Imagine a photography camp where the shutter captures
          not just moments, but the spirit of determination and resilience.
          We're thrilled to present a unique experience tailored for students
          with determination, where the focus is not just on framing a shot, but
          on framing a brighter future.
          <br />
          In the heart of this camp, we celebrate the power of visual
          storytelling as a means of empowerment. Our goal is to provide a
          supportive and inclusive environment for young photographers who
          navigate the world with determination. Through the lens of a camera,
          we embark on a journey that transcends barriers and amplifies the
          voices that often go unheard.
        </p>
        <div className="flex items-center justify-center mt-10">
          <img src={presentation} className="h-[400px] w-full object-cover" alt="" />
        </div>

        {/* Updated Flex Container */}
        <div className="flex h-[400px]">
          {/* Text Portion (2/3 width) */}
          <div className="w-2/3 bg-[#CF796C] text-white p-8">
            <h2 className="text-6xl font-bold">01</h2>
            <p className="mt-4 text-lg font-semibold">
              Lorem Ipsum is simply dummy text of the printing
            </p>
            <p className="mt-2 text-sm leading-relaxed opacity-80">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Image Portion (1/3 width) */}
          <div className="w-1/3">
            <img
              src={photography}
              alt="photography"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p>
          We invite you to join us on this journey of limitless creativity and
          boundless possibilities. We believe that every student has the
          potential to make a difference in the world, and we're excited to
          provide a platform for them to explore their passions and achieve
          their dreams. As we work together to create a world where the shutter
          captures not just moments, but the spirit of determination and
          resilience, we invite you to join us on this journey of limitless
          creativity and boundless possibilities.
        </p>
      </div>
    </div>
  );
};

export default About;
