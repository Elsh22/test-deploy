"use client";
import { 
  Edit, 
  Share2, 
  Mail, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ArrowRight 
} from 'lucide-react';

interface GetFeaturedProps {
  setShowSubmissionModal: (show: boolean) => void;
}

const GetFeatured = ({ setShowSubmissionModal }: GetFeaturedProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Get Featured on DMC Blog</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your DMC experience with our community. We're always looking for inspiring stories
            and valuable insights from our partners and supporters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Write about DMC */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-blue-600 mb-6">
              <Edit className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-4">1. Create Your Content</h3>
            <p className="text-gray-600 mb-4">
              Write an article, blog post, or create content about your experience with DMC.
              Focus on impact, experiences, and valuable insights.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>1000-2000 words recommended</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <span>Include relevant media</span>
              </li>
            </ul>
          </div>

          {/* Share and Tag */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-blue-600 mb-6">
              <Share2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-4">2. Share and Tag Us</h3>
            <p className="text-gray-600 mb-4">
              Share your content on your preferred platform and make sure to tag DMC
              so we can find and feature your story.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-6 h-6 text-gray-600" />
              <Twitter className="w-6 h-6 text-gray-600" />
              <Linkedin className="w-6 h-6 text-gray-600" />
            </div>
          </div>

          {/* Submit Directly */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-blue-600 mb-6">
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-4">3. Submit Directly</h3>
            <p className="text-gray-600 mb-4">
              Alternatively, you can submit your content directly to us via email
              for review and feature consideration.
            </p>
            <button 
              onClick={() => setShowSubmissionModal(true)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetFeatured;