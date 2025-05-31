#include <iostream>
#include <climits>
using namespace std;
int getMax(int arr[], int size){

    int max= arr[0];
    for (int i = 0; i < size; i++)
    {
       if (arr[i]>max)
       {
        max=arr[i];
       }
}
return max;
}
int main()
{
int array[5] ={1,4,7,990,87};
int final = getMax(array,5);
cout<<final;



}