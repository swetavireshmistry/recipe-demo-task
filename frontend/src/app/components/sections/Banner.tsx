'use client';
import { BannerProps } from "@/types/types";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: '.h1n',
    prevEl: '.h1p',
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

const Banner: React.FC<BannerProps> = ({ popularRecipesData }) => {
  return (
    <>
      {/* Banner Section */}
      <section className="banner-section-three">
        <Swiper {...swiperOptions} className="main-slider-carousel">

          {popularRecipesData.map((recipe) => (
            <SwiperSlide key={recipe._id}>
              <div className="slide" style={{ backgroundImage: `url(/assets/images/upload/${recipe.photo})` }}>
                <div className="auto-container">
                  {/* Content Column */}
                  <div className="content-box">
                    <div className="box-inner">
                       {/* Map through the tags array to create a div for each tag */}
                       {recipe.tags.map((tag, index) => (
                          <div className="category" key={index}>
                              <div className="tag" key={index}>{tag}</div>
                          </div>
                            ))}
                      <h3>
                        <Link href={`recipes/${recipe._id}`}>{recipe.title}</Link>
                      </h3>
                      <ul className="post-info">
                        <li>{recipe.author}</li>
                        <li>{new Date(recipe.createdAt).toLocaleDateString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </section>
      {/* End Banner Section */}
    </>
  );
};

export default Banner;
