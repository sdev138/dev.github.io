# Personal Website Revamp

The following is a plan to revamp the entire personal website to make it more modern, and customizeable for later use. The following must be done:

## Things to be done:

- Migrate the entire application to `bun` so that the application can be easier to build, test, and work on
- Update to the new design and what will be done, look at the design section of this revamp
- Add three sections that will be accessed by the user, "work", "products", "blog", these three sections will be navigating to different pages. The url will end up looking something like this: `https://devsamarth.com/work` etc.

| Section  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Work     | The work section will cover a timeline of my work experience.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Products | This section will cover the products/projects I have built.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Blog     | This will be my blog, where I can post whenever and whatever I want. These blog posts need to be able to read in markdown pages and display them as rendered HTML just like markdown preview. This page should be able to read my markdown pages in order and assign dates to said blog post, their should also be a universal counter where each time a person clicks on a post, the counter increments, this is the number of "views" for a certain post. Their should be a minimalist eye icon to the left of the counter so that it explicit to the user that this figure represents the number of views each blog post has gotten |

## The Design

I want you to use the following sites as an example

- https://benji.org/
- https://www.creativestefan.work/
- https://www.hasithbasnayake.com/

Notice how simple and clean these websites are. They are clean, simple, and minimal, as if you are stepping out of the internet entirely. This is how the site should be configured.

### The main theme of the Design

The main theme of the design will be from Nier Automata, specifically the menus and user interface. A systematic and sterile, but also beautiful design. Avoiding ornate decorations and a focus on a clean, graceful, and flat design. Feel free to take a look at the following pictures and their links as a reference.

- https://duckduckgo.com/?t=ffab&q=nier+automata+UI&ia=images&iax=images&iai=https%3A%2F%2Fwww.platinumgames.co.jp%2Fdev-nier-automata%2Fwp-content%2Fuploads%2Fsites%2F11%2F2017%2F08%2FUI_map.png
- https://duckduckgo.com/?t=ffab&q=nier+automata+UI&ia=images&iax=images&iai=https%3A%2F%2Fs3-alpha.figma.com%2Fhub%2Ffile%2F2314122470294662014%2Fd719ab06-b00d-4e0b-ad13-965efb514652-cover.png
- https://duckduckgo.com/?t=ffab&q=nier+automata+UI&ia=images&iax=images&iai=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fef%2F6b%2F07%2Fef6b072e2737246cacf728597c37787e.jpg

You can see how its beige and black. Rather than beige and black, I want the site to be white and grey while keeping the nier automata aesthetic. And instead of a picture of myself, I want their to be a rotating grey cube similar to the cubes you see in the menus of the first and third link that I have already provided. This small rotating black cube, will be on the upper left of the main paragraph or description of the site on all of the pages not just the homepage. Whenever a link is pressed, whether it is a link to the blog, projects, or the back button back to the homepage. The rotating cube should jump up fast, and as soon as it lands, we finish navigating to that specific page.

## Additional Notes

- The way this website is currently deployed, is that it uses Github-pages to deploy the application or gh-pages. I want the deployment process to be the same to how it was before the revamp, the only thing that should change is the actual website
- When implementing the website, keep the website implementation simple, their is no need to have a hundred files all over the place, just a simple html file, css, and the necessary react components are all that is needed
- The site is located at `dev.github.io/devsamarth_v3`, the repo itself is `/dev.github.io`

If you have any questions, feel free to let me know.
