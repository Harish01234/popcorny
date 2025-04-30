import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { deleteData, getData } from '@/services/savetolocal'

const renderMovie = ({ item }: { item: Movie }) => (
  <TouchableOpacity
    onPress={() => {
      // You can add navigation or modal logic hererr
      deleteData(item.id);
    }}
    style={{ marginBottom: 10 }}
  >
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      style={{ width: 100, height: 150, borderRadius: 8 }}
    />
    <Text style={{ color: 'white', marginTop: 5, width: 100 }} numberOfLines={1}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const Saved = () => {
  const [movies, setMovies] = useState<Movie[]>([]);  // State to hold the list of saved movies

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getData();  // Get the saved movies
      setMovies(data);  // Set the state with the fetched movies
    };

    fetchMovies();  // Fetch movies on component mount
  }, [movies]);  // Empty dependency array ensures it runs once after the first render



  return (
    <View className='flex-1 bg-black'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text className='text-white text-2xl font-bold mt-[30%] ml-5'>Saved Movies</Text>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <FlatList
          data={movies}  // Pass the state that holds the movies array
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "flex-start", gap: 20, paddingRight: 5, marginBottom: 10 }}
          contentContainerStyle={{ columnGap: 5 }}
          className="mt-2 pb-32"
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Saved;
