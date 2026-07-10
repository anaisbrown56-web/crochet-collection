export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-4xl font-bold text-dark">About Anaïs</h1>

      <div className="mt-8 overflow-hidden rounded-3xl shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anais.jpg"
          alt="Anaïs"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-dark/80">
        <p>
          Hi, I&apos;m Anaïs! I&apos;m a incoming sophomore in college who is a passionate crocheter.
          What started as a hobby quickly
          became a creative outlet and now this site is my little gallery of
          handmade treasures.
        </p>
        <p>
          I got into crocheting when I was 15 years old. I was feeling stressed out from high school and wanted something to keep me busy. I loved 
          the feeling of creating something with my hands and the satisfaction of seeing the finished product. I taught a lot of my friends how to crochet and 
          we would crochet together weekly in the barn where we would all hang out. These weekly sessions were called "Yarn in the Barn" and were some of the highlights of my high school experience. 
        </p>
        <p>
          When I&apos;m not crocheting, I love exploring new places and trying new restaurants. Also, I love to code, and this website is one of many personal projects I have worked on. This website was built with Next.js, Tailwind CSS, and Firebase. Thanks for
          stopping by, I hope my work brings a little warmth to your day!
        </p>
      </div>
    </div>
  );
}
