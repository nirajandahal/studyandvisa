import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Divider, Row } from 'antd';
import ProgressiveImageLoading from 'apps/student/components/ProgressiveImage';
import NameFormatter from '../../../../../libs/NameFormatter';
import { EyeIcon, Link } from 'lucide-react';
import MaxWidthWrapper from 'apps/student/components/MaxWidthWrapper';
import { fetchBlogBySlug } from '../../api/blog';
import { renderImage } from 'libs/services/helper';
import Image from 'next/image';
import DetailBanner from 'apps/student/components/DetailBanner';
import { isArray } from 'util';

interface IBlog {
  id: string;
  title: string;
  contents: string;
  coverImage: string;
  images: string;
  tags: string[];
  slug: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const BlogDetails = ({ searchParams }: any) => {
  const { blog } = searchParams;
  console.log(blog, 'blog');
  const [blogData, setBlogData] = useState<IBlog>();
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response: any = await fetchBlogBySlug({ blog });
        console.log(response, 'response');
        setBlogData(response.data);
      } catch (error) {
        console.error('Failed to fetch university:', error);
      }
    };
    fetchBlog();
    async function fetchAllBlogs() {
      try {
        const response = await fetchBlog();
        // @ts-ignore
        setBlogPosts(response?.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAllBlogs();
  }, [blog]);

  function Component() {
    return (
      <section className="py-4">
        <h1 className="text-white text-2xl md:text-3xl font-bold lg:w-[37rem]">
          Navigating higher studies in Australia : A comprehensive guide{' '}
        </h1>
        {/* <h2 className="text-white text-xl mt-4">
          Explore the subject areas below to view related courses and find the
          course that’s right for you.
        </h2> */}
      </section>
    );
  }

  return (
    <section className="mx-auto overflow-hidden bg-white">
      <DetailBanner height="h-[350px] " component={<Component />} />
      <MaxWidthWrapper>
        <section className={'py-5 '}>
          <div className="px-5 sm:px-10 md:px-14 lg:px-24 my-3 my-3">
            <Breadcrumb separator={'>'}>
              <Breadcrumb.Item className="text-dark-blue">Home</Breadcrumb.Item>
              <Breadcrumb.Item className="text-dark-blue">Blog</Breadcrumb.Item>
              <Breadcrumb.Item className="text-navy-blue">
                {blogData?.title}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </section>

        <div className="px-5 sm:px-10 md:px-14 lg:px-24 my-3 my-3">
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={17} lg={17}>
              <div>
                <h3 className=" text-dark-blue text-2xl md:text-3xl font-bold mt-2.5 jt-secondary-font my-3 sm:mb-0 ">
                  {blogData?.title}
                </h3>
                <div className="flex items-start gap-5 mt-3">
                  {blogData?.tags?.map((item, index) => (
                    <h1
                      key={index}
                      className="opacity-80 text-sm font-semibold pl-2 text-[#e7b416]"
                    >
                      #{item}
                    </h1>
                  ))}
                </div>

                <div
                  className=" text-base f leading-1.5 "
                  dangerouslySetInnerHTML={{
                    __html: blogData?.contents || '',
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {/* <EyeIcon />
                0 views
                <span className="inline-block h-2 w-2 mx-1 rounded-full bg-black opacity-30" /> */}
              </div>

              {/* <div className="mt-2">
                by{' '}
                <span className="font-medium">
                  <NameFormatter
                    firstName={blogData?.author?.firstName || ''}
                    lastName={blogData?.author?.lastName || ''}
                  />
                </span>
              </div> */}
            </Col>
            <Col xs={7} className="hidden lg:block">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 bg-white py-4">
                  <div className="bg-[#000] w-[200px]  h-[100px]  relative overflow-hidden">
                    <div
                      style={{
                        backgroundImage: `url(${renderImage({
                          imgPath: 'test' || '',
                          size: 'md',
                        })})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    ></div>
                  </div>
                  <div>
                    <h1 className="text-dark-blue  font-bold font-semibold ">
                      Navigating Higher Studies in Australia: A Comprehensive
                      Guide
                    </h1>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white py-4">
                  <div className="bg-[#000] w-[200px]  h-[100px]  relative overflow-hidden">
                    <div
                      style={{
                        backgroundImage: `url(${renderImage({
                          imgPath: 'test' || '',
                          size: 'md',
                        })})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    ></div>
                  </div>
                  <div>
                    <h1 className="text-dark-blue  font-bold font-semibold ">
                      Navigating Higher Studies in Australia: A Comprehensive
                      Guide
                    </h1>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white py-4">
                  <div className="bg-[#000] w-[200px]  h-[100px]  relative overflow-hidden">
                    <div
                      style={{
                        backgroundImage: `url(${renderImage({
                          imgPath: 'test' || '',
                          size: 'md',
                        })})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    ></div>
                  </div>
                  <div>
                    <h1 className="text-dark-blue  font-bold font-semibold ">
                      Navigating Higher Studies in Australia: A Comprehensive
                      Guide
                    </h1>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default BlogDetails;
