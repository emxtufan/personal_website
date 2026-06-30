import DecryptedText from './DecryptedText';


const logos = [
  'https://framerusercontent.com/images/4Duc9jAzy5n2pihlggojjobzoFY.png?width=240&height=60',
  'https://framerusercontent.com/images/vHefiBOPN6XosJjAumfOA2cBWuE.png?width=240&height=60',
  'https://framerusercontent.com/images/OqGeA6X1kvzw2ENP1joxrk8sYGo.png?width=240&height=60',
  'https://framerusercontent.com/images/1ZvsWBs6j8rlPXIsWZf8vojmM.png?width=240&height=60',
  'https://framerusercontent.com/images/TgodfeZXEPivUzTD8qFece1cg.png?width=240&height=60',
  'https://framerusercontent.com/images/owwLl8exEhKyqVW3m6Nj4IyMEfs.png?width=240&height=60',
  'https://framerusercontent.com/images/HPP9xDMe5KQSCYODQHBx0YRidU.png?width=240&height=60',
  'https://framerusercontent.com/images/VMeaD44qOWF408tg875ZBvSiN2U.png?width=240&height=60',
];



export default function LogoStrip() {
  return (
    <section className="logo-strip" id="logos" aria-label="Partner logos">
      <DecryptedText
        text="Tehnologii pe care le folosim"
        speed={40}
        maxIterations={18}
        characters="ABCD1234!?"
        animateOn="view"
        className="font-mono text-center text-[12px] font-medium uppercase tracking-[0.22em] text-white/70"
        parentClassName="mb-5 block w-full text-center"
        encryptedClassName="font-mono text-center text-[12px] font-medium uppercase tracking-[0.22em] text-white/25"
      />
      <div className="logo-track">
        {[...logos, ...logos].map((logo, index) => (
          <div className="logo-item" key={`${logo}-${index}`}>
            <img src={logo} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
