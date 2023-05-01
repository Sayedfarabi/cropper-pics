import React from 'react';


const Navbar = () => {
    return (
        <section>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <p className='btn btn-ghost normal-case text-xl text-blue-500'>Cropper<span className='text-lime-500'>Pics</span></p>
                </div>

                <div className="navbar-end">
                    <a href='#cropper'>
                        <button className='btn bg-blue-500 btn-sm hover:text-lime-500'>Get Started</button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Navbar;