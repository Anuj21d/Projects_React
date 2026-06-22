const features = [
  {
    icon: "/icons/item1.svg",
    color: "#ffd8e6",
    title: "AI Deep Analysis",
    text: "Our neural networks see beyond pixels to understand the true intent of your art.",
  },
  {
    icon: "/icons/item2.svg",
    color: "#ffe173",
    title: "Tone Tuning",
    text: "Switch between professional, witty, or poetic tones with a single click.",
  },
  {
    icon: "/icons/item3.svg",
    color: "#c4e7ff",
    title: "Lightning Fast",
    text: "Results delivered in under 2 seconds. No more waiting for inspiration to strike.",
  },
  {
    icon: "/icons/item4.svg",
    color: "#d9c0c8",
    title: "Global Support",
    text: "Generate captions in over 50 languages to reach a truly global audience.",
  },
  {
    icon: "/icons/item5.svg",
    color: "#d9dadb",
    title: "Smart Cropping",
    text: "Automatically identify the focal point of your image for better context.",
  },
  {
    icon: "/icons/item6.svg",
    color: "#ff85c0",
    title: "Cloud Sync",
    text: "Your history and preferences follow you across every device you own.",
  },
];

export default function Superpowers() {
  return (
    <section className="w-full" aria-labelledby="features-title">
      <div className="text-center">
        <p className="text-[28px] font-bold" id="features-title">
          Superpowers Included
        </p>
        <p className="mt-2 text-muted-text">Everything you need to describe the indescribable.</p>
      </div>
      <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            className="flex min-h-56 flex-col gap-2 rounded-[28px] border-[3px] border-ink bg-white p-6 leading-6 shadow-hard transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg md:rounded-[40px] md:p-8"
            key={feature.title}
          >
            <img
              className="h-14 w-14 rounded-full border-[3px] border-ink p-[15px]"
              src={feature.icon}
              alt=""
              style={{ backgroundColor: feature.color }}
            />
            <p className="pt-3 text-[19px] font-bold">{feature.title}</p>
            <p className="leading-6">{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
