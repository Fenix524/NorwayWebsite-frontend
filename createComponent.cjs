// Виклик --> npm run createComponent НазваКомпоненту1 НазваКомпоненту2 ...

// До package.json потрібно додати наступний скрипт
// "scripts": {
//   "cc": "node createComponent.cjs"
// }

const fs = require('fs')
const path = require('path')

const componentNames = process.argv.slice(2)
checkComponentNames(componentNames)

componentNames.forEach(componentName => {
	const componentDir = createComponentDir(componentName)
	if (componentDir) {
		createComponentFiles(componentDir, componentName)
	}
})

function checkComponentNames(componentNames) {
	if (!componentNames.length) {
		console.error('Будь ласка, вкажіть назву компонента')
		process.exit(1)
	}
}

function createComponentDir(componentName) {
	const componentDir = path.join(__dirname, 'src', 'components', componentName)
	if (fs.existsSync(componentDir)) {
		console.error(`Компонент ${componentName} вже існує.`)
		return null
	}

	fs.mkdirSync(componentDir, { recursive: true })
	return componentDir
}

function createComponentFiles(componentDir, componentName) {
	const jsxContent = `import css from './${componentName}.module.css';

  const ${componentName} = () => {
    return (
      <div className={css.${componentName}}>
        
      </div>
    );
  };

  export default ${componentName};
  `

	fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxContent)
	fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), ``)

	console.log(`Компонент ${componentName} було успішно створено!`)
}
