export default function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-footer px-5 py-10 md:px-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:items-center md:text-left">
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="text-2xl font-bold">CapMeSketch</h2>
          <p className="text-[#705d00]">@ 2026 CapMeSketch. Built for humans</p>
        </div>
        <div>
          <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
            <li className="cursor-pointer hover:underline">Terms of Service</li>
            <li className="cursor-pointer hover:underline">Contact Us</li>
            <li className="cursor-pointer hover:underline">Documentation</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
