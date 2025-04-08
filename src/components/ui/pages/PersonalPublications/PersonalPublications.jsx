import { useEffect, useState } from "react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Loading from "../../elements/Loading";
import { Button, Container, Flex, Group, Image, Pagination, Text, Title } from "@mantine/core";
import BlogList from "../../containers/BlogList/BlogList";

import styles from "./PersonalPublications.module.scss";
import RecipeList from "../../containers/RecipeList/RecipeList";
import { Link } from "react-router";
import { IconWriting } from "@tabler/icons-react";

export default function PersonalInfo() {
  const { user } = useAuth();
  const [blogPage, setBlogPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(1);

  const pageSize = 9;

  const {
    items: personalBlogs,
    itemsLoading: blogLoading,
    itemsError: blogError,
    totalPages: blogTotalPages,
    getItems: getPersonalBlogs,
  } = useItemsCRUD(endpoints.blog, {
    filter: `_ownerId="${user._id}"`,
    relations: "author=_ownerId:authors@_ownerId",
    sort: "_createdOn desc",
    pageSize: pageSize,
  });

  const {
    items: recipes,
    itemsLoading: recipesLoading,
    itemsError: recipesError,
    totalPages: recipesTotalPages,
    getItems: getPersonalRecipes,
  } = useItemsCRUD(endpoints.recipes, {
    filter: `_ownerId="${user._id}"`,
    relations: "author=_ownerId:authors@_ownerId",
    sort: "_createdOn desc",
    pageSize: pageSize,
  });

  useEffect(() => {
    getPersonalBlogs();
    getPersonalRecipes();
  }, []);

  if (blogLoading || recipesLoading) return <Loading />;
  if (blogError || recipesError) return <div>Error:{blogError || recipesError}</div>;

  return (
    <Container size="xl" className={styles.container}>
      {personalBlogs.length === 0 && recipes.length === 0 && (
        <Image h={400} w="auto" fit="contain" src="/images/Be_more_creative.jpg" alt="Be more creative" />
      )}

      {personalBlogs.length === 0 ? (
        <Flex justify="flex-start" align="center" gap="lg" mt="xl">
          <Text>You have not created any posts yet.</Text>
          <Button
            variant="filled"
            size="compact-md"
            radius="0"
            leftSection={<IconWriting size={16} />}
            className={styles.button}
            component={Link}
            to="/blog/create"
          >
            Create Blog Post
          </Button>
        </Flex>
      ) : (
        <>
          <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
            Your Posts
          </Title>
          <BlogList articles={personalBlogs} />

          {blogTotalPages > 1 && (
            <Group justify="center" mt="lg">
              <Pagination radius="0" total={blogTotalPages} value={blogPage} onChange={setBlogPage} />
            </Group>
          )}
        </>
      )}

      {recipes.length === 0 ? (
        <Flex justify="flex-start" align="center" gap="lg" mt="xl">
          <Text>You have not created any recipes yet.</Text>
          <Button
            variant="filled"
            size="compact-md"
            radius="0"
            leftSection={<IconWriting size={16} />}
            className={styles.button}
            component={Link}
            to="/recipes/create"
          >
            Create Recipe
          </Button>
        </Flex>
      ) : (
        <>
          <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
            Your Recipes
          </Title>
          <RecipeList recipes={recipes} columns={3} />

          {recipesTotalPages > 1 && (
            <Group justify="center" mt="lg">
              <Pagination radius="0" total={recipesTotalPages} value={recipesPage} onChange={setRecipesPage} />
            </Group>
          )}
        </>
      )}
    </Container>
  );
}
