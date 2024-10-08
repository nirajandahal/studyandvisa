'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Breadcrumb, Typography, Image, Tabs, Empty } from 'antd';
import { MapPin, ChevronRight } from 'lucide-react';
import MaxWidthWrapper from 'apps/student/components/MaxWidthWrapper';
import Link from 'next/link';
import { fetchUniversityBySlug } from 'apps/student/app/api/university';
import { capitalizeFirstLetter } from 'libs/utils';
import UniversityRankingCard from './RankingCard';
import UniversityFinanceDetails from './Finances';
import { renderImage } from 'libs/services/helper';
import DetailBanner from 'apps/student/components/DetailBanner';
import CustomSearch from 'apps/student/components/CustomSearch.tsx';

interface IUniversity {
  id: string;
  universityName: string;
  universityAddress: string;
  universityContactNumber: string;
  universityEmail: string;
  slug: string;
  worldRanking: number;
  countryRanking: number;
  universityImage: string;
  description: string;
  isFeatured: boolean;
  isEnglishCourseAvailable: boolean;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDelete: boolean;
  financeDetails: {
    id: string;
    tuitionFee: string;
    currency: string;
    financialAidAvailable: boolean;
    scholarshipDetails: string;
    createdAt: Date | null;
    createdBy: string | null;
    updatedAt: Date | null;
    updatedBy: string | null;
  };
  courses: {
    id: string;
    courseName: string;
    slug: string;
    description: string;
    isFeatured: boolean;
    createdAt: Date;
    createdBy: string | null;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deletedBy: string | null;
    isActive: boolean;
    isDelete: boolean;
    studyLevel: {
      name: string;
    };
  }[];
}

const { TabPane } = Tabs;

const UniversityDetails = ({ searchParams }: any) => {
  const { uni } = searchParams;
  const [universityDetails, setUniversityDetails] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUniversityBySlug({ uni });
        console.log(response, 'response');
        setUniversityDetails(response);
      } catch (error) {
        console.error('Failed to fetch university:', error);
      }
    };
    fetchData();
  }, [uni]);
  console.log(universityDetails, 'details');
  const coursesTabs = useMemo(() => {
    const studyLevelsMap = new Map();
    universityDetails?.courses?.forEach((course: any) => {
      console.log(course.studyLevel.name, 'c study anme');
      const studyLevel = capitalizeFirstLetter(course.studyLevel.name);
      if (!studyLevelsMap.has(studyLevel)) {
        studyLevelsMap.set(studyLevel, []);
      }
      const coursesForStudyLevel = studyLevelsMap.get(studyLevel);
      if (
        !coursesForStudyLevel.some(
          (c: any) => c.courseName === course.courseName
        )
      ) {
        coursesForStudyLevel.push({
          courseName: course.courseName,
          courseLink: `/course/details?course=${course.slug}`,
        });
      }
    });
    return Array.from(studyLevelsMap).map(([studyLevel, courses], index) => (
      <TabPane key={index.toString()} tab={studyLevel}>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course: any, index: number) => (
              <li
                key={`${index}_${course.courseName}`} // Ensure the key is unique
                className="flex items-center gap-2 font-Open_Sans"
              >
                <ChevronRight size={16} />
                <Link href={course.courseLink}>{course.courseName}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <Empty
            description={
              <Typography.Text className="text-2xl">
                No Courses found
              </Typography.Text>
            }
          />
        )}
      </TabPane>
    ));
  }, [universityDetails]);

  function Component() {
    return (
      <section className="py-4">
        <div className="flex flex-col text-black md:flex-row gap-6 justify-center md:justify-start  ">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                {universityDetails?.universityName}
              </h1>
              <h1 className="text-white ">
                {universityDetails?.universityAddress}
              </h1>
            </div>

            <div className="flex gap-4 flex flex-col">
              {universityDetails?.worldRanking && (
                <span className="text-white">
                  World Ranking: {universityDetails?.worldRanking}
                </span>
              )}
              {universityDetails?.countryRanking && (
                <span className="text-white">
                  Country Ranking: {universityDetails?.countryRanking}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto overflow-hidden">
      <DetailBanner height="h-[350px]" component={<Component />} />
      <MaxWidthWrapper>
        <section className="pb-5 pt-3 bg-white">
          <div className="px-5 sm:px-10 md:px-14 lg:px-24 mx-auto my-3">
            <Breadcrumb separator=">">
              <Breadcrumb.Item className="text-dark-blue">Home</Breadcrumb.Item>
              <Breadcrumb.Item className="text-dark-blue">
                University
              </Breadcrumb.Item>
              <Breadcrumb.Item className="text-navy-blue">
                {universityDetails?.universityName}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </section>


        <section className="px-5 sm:px-10 md:px-14 lg:px-24 bg-white f leading-1.5 flex items-start flex-col md:flex-row">
          <div className="w-full md:w-2/3 md:pr-20">
            {universityDetails ? (
              <>
                {/* <section className="py-4">
                <div className="flex flex-col text-black md:flex-row gap-6 justify-center md:justify-start  ">
                  <div className="flex items-center justify-center border border-gray-900 w-10 h-10 md:w-40 md:h-40">
                    {universityDetails.universityImage ? (
                      <Image
                        src={renderImage({
                          imgPath: universityDetails.universityImage,
                          size: 'md',
                        })}
                        alt="uniimages"
                        height={100}
                        width={100}
                      />
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-dark-blue font-bold text-2xl">
                      {universityDetails?.universityName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <MapPin size={20} />
                      <Typography.Text>
                        {universityDetails?.universityAddress}
                      </Typography.Text>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-dark-blue">
                        World Ranking: {universityDetails?.worldRanking}
                      </span>
                      <span className="text-dark-blue">
                        Country Ranking: {universityDetails?.countryRanking}
                      </span>
                    </div>
                  </div>
                </div>
              </section> */}

                <section className="py-4 font-Open_Sans">
                  <div className="bg-white  ">
                    <h1 className="text-dark-blue font-bold text-2xl md:text-3xl">
                      University Overview
                    </h1>{' '}
                    <p className="text-base f leading-1.5 mt-5">
                      {universityDetails?.description}
                    </p>
                  </div>
                </section>

                <section className="py-4 font-Open_Sans">
                  <div className="bg-white  ">
                    <h1 className="text-dark-blue font-bold text-2xl md:text-3xl mb-5">
                      Courses at {universityDetails?.universityName}
                    </h1>

                    <Tabs defaultActiveKey="1">{coursesTabs}</Tabs>
                  </div>
                </section>
              </>
            ) : (
              <Empty description="University details not found" />
            )}
          </div>

          <div className="w-full md:w-1/3">
            <section className="py-4">
              <div className="bg-white  ">
                <h1 className="text-dark-blue font-bold text-2xl md:text-3xl">
                  University Ranking
                </h1>
                <UniversityRankingCard
                  worldRanking={universityDetails?.worldRanking}
                  countryRanking={universityDetails?.countryRanking}
                />
              </div>
            </section>

            <section className="py-4">
              <div className="bg-white  ">
                <h1 className="text-dark-blue font-bold text-2xl md:text-3xl">
                  Finance Details
                </h1>
                <UniversityFinanceDetails
                  financeDetails={universityDetails?.financeDetails}
                />
              </div>
            </section>
          </div>
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default UniversityDetails;
