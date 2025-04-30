"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}

const Articles: React.FC = () => {
  // Sample health articles data
  const articles: Article[] = [
    {
      id: 1,
      title: "Understanding the Benefits of Mediterranean Diet",
      excerpt: "Discover how the Mediterranean diet can improve heart health and reduce the risk of chronic diseases.",
      imageUrl: "/api/placeholder/600/400",
      link: "https://www.health.harvard.edu/blog/a-practical-guide-to-the-mediterranean-diet-2019032116194",
    },
    {
      id: 2,
      title: "The Science of Sleep: Why It Matters",
      excerpt: "Learn why quality sleep is essential for your physical and mental health and how to improve your sleep habits.",
      imageUrl: "/api/placeholder/600/400",
      link: "https://www.sleepfoundation.org/how-sleep-works/why-do-we-need-sleep",
    },
    {
      id: 3,
      title: "Exercise and Mental Health Connection",
      excerpt: "Research shows regular physical activity can significantly reduce symptoms of anxiety and depression.",
      imageUrl: "/api/placeholder/600/400",
      link: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495",
    },
  ];

  return (
    <div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Articles and more</h2>
              <p className="text-gray-600 mt-2">Explore the latest health insights and medical advancements</p>
            </div>
            <Link href="/articles">
              <button className="mt-4 md:mt-0 border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                View All Articles
              </button>
            </Link>
          </div>
          
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="w-full h-48 relative">
                  <Image 
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-blue-500 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;