import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { images } from '@/constants/images';
import Searchbar from '@/components/Searchbar';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [query, setQuery] = useState<string>("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadmovies,
    reset: reload,
    
  } = useFetch(() => fetchMovies({ query: query }));


  useEffect(() => {

    const timeoutid = setTimeout(async () => {
      if (query.trim()) {
        await loadmovies();

         // Call updateSearchCount only if there are results
         if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(query, movies[0]);
        }
      }
      else {
        reload();
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutid);
    }

  }, [query])




  return (
    <View className="flex-1 bg-black">
      <Image source={images.bg} className="absolute w-full z-0" />

      {/* Your content goes here */}
      <ScrollView
        className='mt-3 mx-5 '
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => (<MovieCard  {...item} />)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "flex-start", gap: 20, paddingRight: 5, marginBottom: 10 }}
          contentContainerStyle={{ columnGap: 5 }}
          className="mt-2 pb-32"
          scrollEnabled={false}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-20 items-center mb-5">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>
              <View className='my-5'>

                <Searchbar value={query}
                  onChangeText={(text) => setQuery(text)}
                  placeholder="Search tranding movies" />
              </View>

              {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-white text-center mt-2">
                 Error: {moviesError.message}
              </Text>
            )}

{!moviesLoading &&
              !moviesError &&
              query.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold mb-4">
                  Search Results for{" "}
                  <Text className="text-accent">{query}</Text>
                </Text>
              )}


            </>
          }

          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {query.trim()
                    ? "No movies found"
                    : "Start typing to search for movies"}
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>

    </View>
  );
};

export default Search;
