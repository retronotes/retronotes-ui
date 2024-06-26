/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'uploadthing-prod-sea1.s3.us-west-2.amazonaws.com',
            },
          ],
      },
};

export default nextConfig;
