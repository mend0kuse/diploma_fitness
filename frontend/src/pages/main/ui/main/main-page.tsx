import { CreateReviewForm } from '@/entities/review/create-review-form';
import { TReviewCreate } from '@/entities/review/review-types';
import { Layout } from '@/layout';

export const MainPage = () => {
    function onCreate(data: TReviewCreate) {
        console.log(data);
    }

    return (
        <Layout>
            <CreateReviewForm userId={1} onCreate={onCreate} />
        </Layout>
    );
};
