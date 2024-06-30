document.addEventListener('DOMContentLoaded', function() {
    initializeRecipes();

    document.getElementById('ingredient-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked'))
                                         .map(checkbox => checkbox.value);

        const recipes = getPossibleRecipes(selectedIngredients);

        displayRecipes(recipes);
    });
});

function initializeRecipes() {
    const defaultRecipes = [
        { 
            name: "Tomato Soup",
            image: "images/Tomatosoup.jpg",
            ingredients: ["Tomato", "Garlic"],
            procedure: "1. Chop tomatoes and garlic. 2. Cook in a pot until soft. 3. Blend and serve."
        },
        { 
            name: "Cheese Sandwich",
            image: "images/Cheese Sandwich.jpeg",
            ingredients: ["Cheese", "Bread"],
            procedure: "1. Place cheese between two slices of bread. 2. Grill until golden brown."
        },
        { 
            name: "Caprese Salad",
            image: "images/Caprese Salad.jpeg",
            ingredients: ["Tomato", "Cheese", "Basil"],
            procedure: "1. Slice tomatoes and cheese. 2. Arrange on a plate with basil. 3. Drizzle with olive oil."
        },
        { 
            name: "Garlic Chicken",
            image: "images/Garlic Chicken.jpeg",
            ingredients: ["Chicken", "Garlic"],
            procedure: "1. Marinate chicken with garlic. 2. Cook in a pan until done."
        },
        {
            name: "Aloo Gobi",
            image: "images/Aloo Gobi.jpeg",
            ingredients: ["Potato", "Cauliflower", "Turmeric", "Cumin", "Coriander"],
            procedure: "1. Heat oil and add cumin seeds. 2. Add potatoes and cauliflower. 3. Add spices and cook until tender."
        },
        {
            name: "Palak Paneer",
            image: "images/Palak Paneer.jpeg",
            ingredients: ["Spinach", "Paneer", "Garlic", "Ginger", "Onion"],
            procedure: "1. Blanch spinach and blend to a paste. 2. Sauté onion, garlic, and ginger. 3. Add spinach and paneer. Cook until paneer is soft."
        },
        {
            name: "Chicken Biryani",
            image: "images/Chicken Biryani.jpeg",
            ingredients: ["Chicken", "Rice", "Onion", "Garlic", "Ginger", "Cumin", "Coriander"],
            procedure: "1. Marinate chicken with spices. 2. Cook rice separately. 3. Layer chicken and rice. Cook on low heat until done."
        },
        {
            name: "Paneer Butter Masala",
            image: "images/Paneer Butter Masala.jpeg",
            ingredients: ["Paneer", "Tomato", "Garlic", "Ginger", "Butter"],
            procedure: "1. Make tomato gravy with garlic and ginger. 2. Add paneer cubes and butter. Cook until paneer is soft."
        },
        {
            name: "Samosa",
            image: "images/Samosa.jpeg",
            ingredients: ["Potato", "Peas", "Cumin", "Coriander"],
            procedure: "1. Prepare dough and filling. 2. Fill dough with potato and peas mixture. 3. Deep fry until golden brown."
        }
    ];

    if (!localStorage.getItem('recipes')) {
        localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
    }
}

function getPossibleRecipes(ingredients) {
    const recipes = JSON.parse(localStorage.getItem('recipes'));

    return recipes.filter(recipe => 
        recipe.ingredients.every(ingredient => ingredients.includes(ingredient))
    );
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipes');
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found</p>';
    } else {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.name;
            recipeDiv.appendChild(recipeImage);

            const recipeName = document.createElement('h3');
            recipeName.textContent = recipe.name;
            recipeDiv.appendChild(recipeName);

            const recipeIngredients = document.createElement('p');
            recipeIngredients.textContent = 'Ingredients: ' + recipe.ingredients.join(', ');
            recipeDiv.appendChild(recipeIngredients);

            const recipeProcedure = document.createElement('p');
            recipeProcedure.textContent = 'Procedure: ' + recipe.procedure;
            recipeDiv.appendChild(recipeProcedure);

            recipeList.appendChild(recipeDiv);
        });
    }
}
