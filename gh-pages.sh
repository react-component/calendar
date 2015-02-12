npm run less
npm run example
cd ../calendar-gh-pages
rm -rf build/
mkdir build
cp -r ../calendar/build/ build
git add --all
git commit -am "update examples"
git push origin gh-pages:gh-pages