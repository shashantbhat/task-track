import Navbar from "~/routes/home/components/nav-bar";
import Hero from "~/routes/home/components/hero"
const route = () => {
  return (
      <div className="flex items-center justify-center w-full ">
        <Navbar/>
        <Hero/>
      </div>
  )
}

export default route;