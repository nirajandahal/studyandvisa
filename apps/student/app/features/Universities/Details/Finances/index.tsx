import React from 'react';
import { Card, Typography } from 'antd';

const UniversityFinanceDetails = ({ financeDetails }: any) => {
  return (
    <section className="py-4">
      <span className="text-bold text-gray-500 text-1xl">
        How much will it cost?
      </span>
      <div className="card-grid mt-5">
        <Card className="bg-white w-full">
          <Typography.Title level={5}> Tuition Fee</Typography.Title>
          <Typography.Paragraph>
            {financeDetails?.tuitionFee}( {financeDetails?.currency})
          </Typography.Paragraph>
        </Card>
        <Card className="bg-white w-full">
          <Typography.Title level={5}>Financial Aids</Typography.Title>
          <Typography.Paragraph>
            <span className="text-bold text-gray-500 text-1xl">
              {financeDetails?.financialAidAvailable ? 'Yes' : 'No'}
            </span>
          </Typography.Paragraph>
        </Card>
        <Card className="bg-white w-full">
          <Typography.Title level={5}>Scholarships</Typography.Title>
          <Typography.Paragraph>
            <span className="text-bold text-gray-500 text-1xl">
              {financeDetails?.scholarshipDetails === 'yes' ? 'Yes' : 'No'}
            </span>
          </Typography.Paragraph>
        </Card>
        {/* Add more Card components with other relevant information */}
      </div>
    </section>
  );
};

export default UniversityFinanceDetails;
