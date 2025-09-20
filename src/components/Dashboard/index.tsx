import React from "react";
import { GeneratedArticle } from "@/types";
import { Icon } from "@/components/ui/Icon";

interface DashboardProps {
  articles: any[];
  onViewArticle: (article: GeneratedArticle) => void;
}

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: "chart-bar" | "tag" | "share";
}> = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm flex items-center gap-4">
    <div className="bg-brand-light dark:bg-brand-dark p-3 rounded-full">
      <Icon
        icon={icon}
        className="w-7 h-7 text-brand-primary dark:text-brand-light"
      />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({
  articles = [],
  onViewArticle,
}) => {
  const totalArticles = articles.length;
  const totalKeywords = articles.reduce(
    (acc, article) => acc + article.keywords.length,
    0
  );
  const averageKeywords =
    totalArticles > 0 ? (totalKeywords / totalArticles).toFixed(1) : 0;
  const totalSocialPosts = articles.reduce(
    (acc, article) => acc + article.socialMediaPosts.length,
    0
  );

  return (
    <div className="w-full p-12">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-lg mb-8">An overview of your generated content.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Articles Generated"
          value={totalArticles}
          icon="chart-bar"
        />
        <StatCard title="Average Keywords" value={averageKeywords} icon="tag" />
        <StatCard
          title="Total Social Posts"
          value={totalSocialPosts}
          icon="share"
        />
      </div>

      {/* Article History */}
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Article History
          </h3>
        </div>
        <div className="overflow-x-auto">
          {articles.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Generated On
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="text-sm font-medium text-gray-900 truncate"
                        style={{ maxWidth: "400px" }}
                      >
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500 font-mono">{`/${article.slug}`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.generatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onViewArticle(article)}
                        className="text-brand-primary hover:text-brand-dark font-bold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 px-6">
              <Icon
                icon="clipboard"
                className="w-12 h-12 mx-auto text-gray-300"
              />
              <h3 className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-300">
                No articles yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Go to the 'Generator' to create your first article.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
