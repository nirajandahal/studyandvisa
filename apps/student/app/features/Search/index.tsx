'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Row, Col, Select, Button, Input, Spin } from 'antd';
import { Award, DollarSign, Filter, TrendingUp, X } from 'lucide-react';
import { search } from '../../api/search';
import { renderImage } from 'libs/services/helper';
import Image from 'next/image';
import Link from 'next/link';

const Search = ({ searchParams }: any) => {
  const { location, level, course } = searchParams;
  const [universities, setUniversities] = useState([]);
  const [rankingOrder, setRankingOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [feesOrder, setFeesOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [scholarshipOrder, setScholarshipOrder] = useState<'yes' | 'no'>('no');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await search({
        course,
        level,
        location,
        rankingOrder,
        feesOrder,
        scholarshipOrder,
      });
      setUniversities(response);
      setError(null);
    } catch (error) {
      setError('Failed to fetch universities. Please try again.');
      console.error('Failed to fetch universities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [course, level, location, rankingOrder, feesOrder, scholarshipOrder]);

  const handleRankingOrderChange = async (value: 'ASC' | 'DESC') => {
    setRankingOrder(value);
    await fetchData();
  };

  const handleFeesOrderChange = async (value: 'ASC' | 'DESC') => {
    setFeesOrder(value);
    await fetchData();
  };

  const handleScholarshipOrderChange = async (value: 'yes' | 'no') => {
    setScholarshipOrder(value);
    await fetchData();
  };

  return (
    <section className="mx-auto">
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}
      <section className="container py-5 bg-gray-50 mx-auto">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={18}>
            <div className="flex  flex-wrap gap-4 mx-auto md:gap-6 font-bold justify-center md:justify-start">
              <Filter className="h-30 mt-1.5" />
              <div className="relative">
                <Input
                  prefix={<TrendingUp className="h-4 w-4 mr-2" />}
                  placeholder="Filter By Ranking"
                  className="rounded-md px-2 py-1 mr-2"
                  value={
                    rankingOrder === 'ASC'
                      ? 'Ranking: Low to High'
                      : 'Ranking: High to Low'
                  }
                  readOnly
                />
                <Select
                  defaultValue={rankingOrder}
                  onChange={handleRankingOrderChange}
                  className="absolute inset-0 opacity-0"
                >
                  <Select.Option value="ASC">
                    Ranking: Low to High
                  </Select.Option>
                  <Select.Option value="DESC">
                    Ranking: High to Low
                  </Select.Option>
                </Select>
              </div>
              <div className="relative">
                <Input
                  prefix={<DollarSign className="h-4 w-4 mr-2" />}
                  placeholder="Filter By Fees"
                  className="rounded-md px-2 py-1 mr-2"
                  value={
                    feesOrder === 'ASC'
                      ? 'Fees: Low to High'
                      : 'Fees: High to Low'
                  }
                  readOnly
                />
                <Select
                  defaultValue={feesOrder}
                  onChange={handleFeesOrderChange}
                  className="absolute inset-0 opacity-0"
                >
                  <Select.Option value="ASC">Fees: Low to High</Select.Option>
                  <Select.Option value="DESC">Fees: High to Low</Select.Option>
                </Select>
              </div>
              <div className="relative">
                <Input
                  prefix={<Award className="h-4 w-4 mr-2" />}
                  placeholder="Filter By Scholarship"
                  className="rounded-md px-2 py-1 mr-2"
                  value={
                    scholarshipOrder === 'yes'
                      ? 'Scholarship: yes'
                      : 'Scholarship: No'
                  }
                  readOnly
                />
                <Select
                  defaultValue={scholarshipOrder}
                  onChange={handleScholarshipOrderChange}
                  className="absolute inset-0 opacity-0"
                >
                  <Select.Option value="yes">Scholarship: yes</Select.Option>
                  <Select.Option value="no">Scholarship: no</Select.Option>
                </Select>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      <section className="py-4 f leading-1.5">
        {loading ? (
          <div className="text-center mt-4">
            <Spin size="large" />
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center mt-4">
            <p>No universities found.</p>
          </div>
        ) : (
          <div className="container mx-auto">
            {chunkArray(universities, 4).map((row: any[], index: number) => (
              <Row key={index} gutter={[16, 16]}>
                {row.map((uni: any) => (
                  <Col key={uni.id} xs={24} md={12} lg={6}>
                    <UniversityCard university={uni} />
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

const UniversityCard = ({ university }: any) => {
  return (
    <div className="border-1 border-gray-500 h-auto p-4 flex flex-col justify-between my-4">
      <Link href={`/university/details?uni=${university.slug}`} passHref>
        <div>
          <div className="flex   w-24 h-24 md:w-40 md:h-40">
            <Image
              src={renderImage({
                imgPath: university?.universityImage,
                size: 'md',
              })}
              alt="University Image"
              height={160} // Adjust the height to maintain full size
              width={160} // Adjust the width to maintain full size
            />
          </div>
          <div className="flex flex-col mt-4">
            <span className="font-bold text-dark-blue text-lg md:text-xl ">
              {university.universityName}
            </span>
            <span className="flex   text-sm text-navy-blue">
              {university?.destination?.name}
            </span>
            <div className="flex text-sm text-navy-blue gap-2">
              <TrendingUp />
              <span>World Rank: {university.worldRanking}</span>
            </div>
            {university.isEnglishCourseAvailable && (
              <div className="flex text-sm text-navy-blue gap-2">
                <span className="bg-dark-blue rounded-full text-white text-center text-sm md:text-base p-1 md:p-2">
                  English courses available
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const FilterInput: React.FC<any> = ({ icon, placeholder, order, onChange }) => {
  return (
    <div className="relative text-dark-blue ">
      <Input
        prefix={icon}
        placeholder={placeholder}
        className="rounded-md px-2 py-1 mr-2 text-dark-blue"
        value={
          order === 'ASC' || order === 'DESC'
            ? order === 'ASC'
              ? 'Low to High'
              : 'High to Low'
            : order === 'yes'
            ? 'yes'
            : 'no'
        }
        readOnly
      />
      <Select
        defaultValue={order}
        onChange={(value: 'ASC' | 'DESC' | 'yes' | 'no') => onChange(value)}
        className="absolute inset-0 opacity-0"
      >
        {order === 'ASC' || order === 'DESC' ? (
          <>
            <Select.Option value="ASC">Low to High</Select.Option>
            <Select.Option value="DESC">High to Low</Select.Option>
          </>
        ) : (
          <>
            <Select.Option value="yes">yes</Select.Option>
            <Select.Option value="no">no</Select.Option>
          </>
        )}
      </Select>
    </div>
  );
};

const chunkArray = (array: any[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export default Search;
