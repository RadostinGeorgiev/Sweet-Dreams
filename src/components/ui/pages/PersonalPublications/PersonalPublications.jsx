import { useEffect } from "react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Loading from "../../elements/Loading";
import { Container, Title } from "@mantine/core";
import BlogList from "../../containers/BlogList/BlogList";

import styles from "./PersonalPublications.module.scss";
import RecipeList from "../../containers/RecipeList/RecipeList";

export default function PersonalInfo() {
  const { user } = useAuth();
  const pageSize = 9;

  const {
    items: personalBlogs,
    itemsLoading: personalBlogLoading,
    itemsError: personalBlogError,
    getItems: getPersonalBlogs,
  } = useItemsCRUD(endpoints.blog, {
    filter: `_ownerId="${user._id}"`,
    relations: "author=_ownerId:authors@_ownerId",
    sort: "_createdOn desc",
    pageSize: pageSize,
  });

  const {
    items: personalRecipes,
    itemsLoading: personalRecipesLoading,
    itemsError: personalRecipesError,
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

  if (personalBlogLoading || personalRecipesLoading) return <Loading />;
  if (personalBlogError || personalRecipesError)
    return <div>Error:{personalBlogError || personalRecipesError}</div>;

  return (
    <>
      <Container size="xl" className={styles.container}>
        <Title
          order={4}
          fw={400}
          tt="uppercase"
          align="start"
          c="dimmed"
          className={styles.title}
        >
          Latest Posts
        </Title>
        <BlogList subject={personalBlogs} />

        <Title
          order={4}
          fw={400}
          tt="uppercase"
          align="start"
          c="dimmed"
          className={styles.title}
        >
          Latest Recipes
        </Title>
        <RecipeList recipes={personalRecipes} columns={3} />
      </Container>
    </>
  );
}
