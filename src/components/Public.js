import PublicFooter from './PublicFooter'
import PublicHeader from './PublicHeader'

const Public = () => {
  const content = (
    <section>
      <PublicHeader />
      <div className="col">
        <main>
          <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-lg-5 py-5">
              <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 mb-3">Welcome</h1>
                <p className="col-lg-10 fs-4 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod incidunt sapiente, eligendi odio provident atque? Officiis quas at dolor sapiente minus cumque, hic ipsum ad nemo tempore deserunt asperiores esse nisi libero dolore aliquam. Odio itaque sed laudantium, est officia, incidunt animi eaque suscipit ea corrupti autem libero nostrum!</p>
              </div>
              <div className="col-md-10 mx-auto col-lg-5">
                {/* <form className="p-4 p-md-5 border rounded-3 bg-light">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me"> Remember me</input>
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
              </form> */}
              </div>
            </div>
          </div>
        </main>
      </div>
      <PublicFooter />

    </section>
  )
  return content
}
export default Public