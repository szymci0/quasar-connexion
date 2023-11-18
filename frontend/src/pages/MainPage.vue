<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card>
          <q-card-section align="right">
            <q-btn @click="showCreateModal" color="primary" label="Add article" />
          </q-card-section>
          <q-table :rows="articlesData" :columns="tableColumns" row-key="article_id">
            <template #body-cell-content="props">
              <q-td :props="props">
                <div class="flex justify-content-start">{{ shortenArticle(props.value) }}</div>
              </q-td>
            </template>
            <template #body-cell-actions="props">
              <q-td :props="props">
                <q-btn icon="mode_edit" @click="showEditModal(props.row.article_id)" />
                <q-btn icon="delete" @click="handleDelete(props.row.article_id)" />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </q-page>
      <article-modal
        title="Create article"
        :visible="createModal"
        :on-action="handleCreateArticle"
        action-label="Create"
        :on-cancel="showCreateModal"
      >
        <q-input 
          v-model="newArticle.title" 
          label="Title" 
        />
        <q-input 
          v-model="newArticle.content" 
          label="Content" 
          type="textarea" 
          :rows="5" 
        />
      </article-modal>
      <article-modal
        title="Edit article"
        :visible="editModal"
        :on-action="handleEditArticle"
        action-label="Edit"
        :on-cancel="showEditModal"
      >
        <q-input 
          v-model="newArticle.title" 
          label="Title" 
        />
        <q-input 
          v-model="newArticle.content" 
          label="Content" 
          type="textarea" 
          :rows="5" 
        />
      </article-modal>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { ref } from 'vue';
import { getArticles, createArticle, deleteArticle, editArticle } from '../api/article';
import { onMounted } from 'vue';
import { Notify } from 'quasar';
import ArticleModal from 'src/components/ArticleModal.vue';

const articlesData: QTableProps['rows'] = ref([]);
const tableColumns: QTableProps['columns'] = ref([
  { label: 'Article ID', field: 'article_id', name: 'article_id', align: 'left' },
  { label: 'Title', field: 'title', name: 'title', align: 'left' },
  { label: 'Content', field: 'content', name: 'content', align: 'center' },
  { label: 'Actions', name: 'actions' },

]);

const createModal = ref(false);
const newArticle = ref({
  title: '',
  content: '',
});

const editModal = ref(false);
const currentEdit = ref(0);

const showEditModal = (article_id: number) => {
  editModal.value = !editModal.value;
  currentEdit.value = article_id;
}

const showCreateModal = () => {
  createModal.value = !createModal.value;
};

const shortenArticle = (article: string) => {
  if (article.length > 100) {
    return `${article.slice(0, 100)}...`
  }
  return article
}
const handleCreateArticle = async () => {
  try {
    await createArticle(newArticle.value);
    showSuccessMessage('Successfully created article')
  } catch (error) {
    showErrorMessage(`Error creating article: ${error.message}`);
  } finally {
    showCreateModal();
    await fetchArticles();
  }
}

const handleDelete = async (article_id: number) => {
  try {
    await deleteArticle(article_id);
  } catch(error) {
    showErrorMessage(`Error deleting article: ${error.message}`);
  } finally {
    showSuccessMessage(`Successfully deleted Article with ID ${article_id}`);
    await fetchArticles();
  }
}

const fetchArticles = async () => {
  try {
    const response = await getArticles();
    articlesData.value = response.data;
    newArticle.value.title = '';
    newArticle.value.content = '';
  } catch (error) {
    showErrorMessage(`Error fetching articles: ${error.message}`);
  }
}

const handleEditArticle = async () => {
  try {
    await editArticle(currentEdit.value, newArticle.value);
  } catch (error) {
    showErrorMessage(`Error editing article: ${error.message}`);
  } finally {
    showSuccessMessage('Successfully edited article');
    showEditModal(0);
    await fetchArticles();
  }
}

const showSuccessMessage = (message: string) => {
  Notify.create({
    type: 'positive',
    message: message
  });
}

const showErrorMessage = (error: string) => {
  Notify.create({
    type: 'negative',
    message: error
  });
}

onMounted(async () => {
  await fetchArticles();
})

</script>
