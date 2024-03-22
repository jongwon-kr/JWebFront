import FirstComponent, { FifthComponent } from "./FirstComponent";
import FourthComponent from "./FourthComponent";
import LearningJavaScript from "./LearningJavaScript";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";

export default function LearningComponent() {
  return (
    <div className="LearningComponent">
      <FirstComponent></FirstComponent>
      <SecondComponent></SecondComponent>
      <ThirdComponent></ThirdComponent>
      <FourthComponent></FourthComponent>
      <FifthComponent></FifthComponent>
      <LearningJavaScript></LearningJavaScript>
    </div>
  );
}
