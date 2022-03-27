#include<bits/stdc++.h>
using namespace std;

int helper(int *arr, int start, int end, int sum){
    if(start==end){
        return 1;
    }
    //if we include the 0th element
    int c1 = 1+ helper(arr , start+1, end , sum-arr[0]);
    //if we dont insclude the 1th elemtnt
    int c2 = helper(arr , start +1 , end , sum);
    return max(c1,c2);
}


int main() {
    //ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL);

    long long int test=1;
    cin>>test;
    while(test--)
    {
        int n,l,r,k;
        cin>>n>>l>>r>>k;
        int arr[n];
        for(int i=0;i<n;i++){
           cin>>arr[i];
        }
        sort(arr,arr+n);
        int start=0;
        int end=0;
        for(int i=0;i<n;i++){
            if(arr[i]>=l){
                start=i;
                break;
            }
        }
        for(int i=0;i<n;i++){
            if(arr[i]<=r){
                end=i;
                break;
            }
        }

        int count = helper(arr,start,end,k);
        cout<<count<<endl;
    }
    return 0;
}
