echo 'Removing old folder'
rm -rf dist
mkdir dist

echo 'Adding Assets'
cp index.html dist/index.html
cp style.css dist/style.css
cp -r img dist

echo 'Compiling JS'
./node_modules/.bin/babel \
	. \
	--out-dir dist \
	--ignore node_modules,test
