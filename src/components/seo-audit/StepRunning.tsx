import { motion } from 'framer-motion';
import { LocalMapGrid } from '../LocalMapGrid';

interface StepRunningProps {
    keyword: string;
    business: any;
}

export const StepRunning = ({
    keyword,
    business
}: StepRunningProps) => {
    return (
        <motion.div
            key="step4"
            className="max-w-4xl mx-auto w-full"
        >
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-dark mb-2">Analyzing Local Grid...</h2>
                <p className="text-gray-500">Checking rankings across 16 coordinates in Fresno</p>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <LocalMapGrid
                        keyword={keyword}
                        businessName={business.name}
                        rating={business.rating}
                        reviewCount={business.reviews}
                        showBusinessCard={false}
                        loadingVariant="scan"
                    // Empty gridData implies loading state in component
                    />
                </div>
            </div>
        </motion.div>
    );
};
