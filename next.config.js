/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: false,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.scss$/,
//       use: [
//         {
//           loader: 'sass-loader',
//           options: {
//             sassOptions: {
//               includePaths: ['./src/scss', './src/scss/semantic-ui'],
//             },
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

// module.exports = nextConfig;