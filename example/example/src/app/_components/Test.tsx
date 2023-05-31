import s from './test.module.scss'
import Counter from "@/app/_components/Counter";
import Post from "@/app/_components/Post";

const Test = () => {
  return (
    <section className={`_container ${s.test}`}>
      <h1 className="h1">Next-Zustand</h1>
      <Counter/>
      <Post/>
    </section>
  );
};

export default Test;
