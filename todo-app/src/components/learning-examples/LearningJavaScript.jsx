const person = {
  name: "jongwon",
  age: 26,
  address: {
    line1: "jong Street",
    city: "Ulsan",
    country: "South Korea",
  },
  profiles: ["github", "gmail"],
  printProfile: () => {
    person.profiles.map((profile) => console.log(profile));
  },
};

export default function LearningJavaScript() {
  return (
    <div>
      <div>
        {person.name} {person.age}세
      </div>
      <div>{person.address.line1}</div>
      <div>{person.address.city}</div>
      <div>{person.address.country}</div>
      <div>{person.profiles[0]}</div>
      <div>{person.printProfile()}</div>
    </div>
  );
}
