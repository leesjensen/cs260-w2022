function toggleBucketList() {
  const bucketList = document.getElementById('bucket-list');
  const displayed = bucketList.style.display === 'block';
  bucketList.style.display = displayed ? 'none' : 'block';
}
